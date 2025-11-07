// 活動管理器
class ActivityManager {
    // 生成房間 ID（6 位英數字）
    static generateRoomId() {
        let roomId;
        do {
            roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        } while (this.getActivity(roomId) !== null); // 確保唯一性
        return roomId;
    }

    // 生成參與者 ID
    static generateParticipantId() {
        const stored = sessionStorage.getItem('participantId');
        if (stored) return stored;
        
        const participantId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5);
        sessionStorage.setItem('participantId', participantId);
        return participantId;
    }

    // 儲存活動
    static saveActivity(activity) {
        try {
            localStorage.setItem(`activity_${activity.id}`, JSON.stringify(activity));
            this.updateActivityList(activity);
            return true;
        } catch (e) {
            console.error('儲存活動失敗:', e);
            return false;
        }
    }

    // 取得活動
    static getActivity(roomId) {
        try {
            const data = localStorage.getItem(`activity_${roomId}`);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('讀取活動失敗:', e);
            return null;
        }
    }

    // 更新活動列表
    static updateActivityList(activity) {
        try {
            let list = JSON.parse(localStorage.getItem('activity_list') || '{"activities":[]}');
            const index = list.activities.findIndex(a => a.id === activity.id);
            
            const activityInfo = {
                id: activity.id,
                title: activity.title,
                type: activity.type,
                createdAt: activity.createdAt || new Date().toISOString()
            };

            if (index >= 0) {
                list.activities[index] = activityInfo;
            } else {
                list.activities.push(activityInfo);
            }
            
            localStorage.setItem('activity_list', JSON.stringify(list));
            return true;
        } catch (e) {
            console.error('更新活動列表失敗:', e);
            return false;
        }
    }

    // 取得所有活動
    static getAllActivities() {
        try {
            const list = JSON.parse(localStorage.getItem('activity_list') || '{"activities":[]}');
            return list.activities.sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );
        } catch (e) {
            console.error('讀取活動列表失敗:', e);
            return [];
        }
    }

    // 刪除活動
    static deleteActivity(roomId) {
        try {
            localStorage.removeItem(`activity_${roomId}`);
            let list = JSON.parse(localStorage.getItem('activity_list') || '{"activities":[]}');
            list.activities = list.activities.filter(a => a.id !== roomId);
            localStorage.setItem('activity_list', JSON.stringify(list));
            return true;
        } catch (e) {
            console.error('刪除活動失敗:', e);
            return false;
        }
    }

    // 提交答案（問答模式）
    static submitAnswer(roomId, questionId, answerIndex, participantId, participantName) {
        const activity = this.getActivity(roomId);
        if (!activity || activity.type !== 'qa' || activity.status !== 'active') {
            return { success: false, message: '活動不存在或已結束' };
        }

        const question = activity.questions.find(q => q.id === questionId);
        if (!question) {
            return { success: false, message: '問題不存在' };
        }

        // 初始化 responses
        if (!question.responses) question.responses = {};
        if (!question.responses[answerIndex]) question.responses[answerIndex] = 0;
        question.responses[answerIndex]++;

        // 更新參與者分數
        if (question.correctAnswer === answerIndex) {
            if (!activity.leaderboard) activity.leaderboard = [];
            
            let participant = activity.leaderboard.find(p => p.participantId === participantId);
            if (participant) {
                participant.score += 10;
            } else {
                activity.leaderboard.push({
                    participantId: participantId,
                    score: 10,
                    name: participantName || `參與者${participantId.substring(participantId.length - 4)}`
                });
            }
            
            // 排序排行榜
            activity.leaderboard.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return a.participantId.localeCompare(b.participantId);
            });
        }

        // 記錄參與者
        if (!activity.participants) activity.participants = {};
        if (!activity.participants[participantId]) {
            activity.participants[participantId] = {
                name: participantName || `參與者${participantId.substring(participantId.length - 4)}`,
                joinedAt: new Date().toISOString()
            };
        }

        this.saveActivity(activity);
        return { success: true };
    }

    // 提交回饋
    static submitFeedback(roomId, feedback, participantId) {
        const activity = this.getActivity(roomId);
        if (!activity || activity.type !== 'feedback' || activity.status !== 'active') {
            return { success: false, message: '活動不存在或已結束' };
        }

        if (!feedback || feedback.trim() === '') {
            return { success: false, message: '回饋內容不能為空' };
        }

        if (!activity.feedbacks) activity.feedbacks = [];

        activity.feedbacks.push({
            id: Date.now(),
            text: feedback.trim(),
            timestamp: new Date().toISOString(),
            read: false
        });

        // 按時間倒序排列（最新的在前）
        activity.feedbacks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        this.saveActivity(activity);
        return { success: true };
    }

    // 更新活動狀態
    static updateActivityStatus(roomId, status) {
        const activity = this.getActivity(roomId);
        if (!activity) return false;

        activity.status = status;
        this.saveActivity(activity);
        return true;
    }

    // 更新當前問題
    static updateCurrentQuestion(roomId, questionIndex) {
        const activity = this.getActivity(roomId);
        if (!activity || activity.type !== 'qa') return false;

        if (questionIndex >= 0 && questionIndex < activity.questions.length) {
            activity.currentQuestion = questionIndex;
            this.saveActivity(activity);
            return true;
        }
        return false;
    }

    // 標記回饋已讀/未讀
    static toggleFeedbackRead(roomId, feedbackId) {
        const activity = this.getActivity(roomId);
        if (!activity || activity.type !== 'feedback') return false;

        const feedback = activity.feedbacks.find(f => f.id === feedbackId);
        if (feedback) {
            feedback.read = !feedback.read;
            this.saveActivity(activity);
            return true;
        }
        return false;
    }

    // 刪除回饋
    static deleteFeedback(roomId, feedbackId) {
        const activity = this.getActivity(roomId);
        if (!activity || activity.type !== 'feedback') return false;

        activity.feedbacks = activity.feedbacks.filter(f => f.id !== feedbackId);
        this.saveActivity(activity);
        return true;
    }

    // 清除所有回饋
    static clearAllFeedbacks(roomId) {
        const activity = this.getActivity(roomId);
        if (!activity || activity.type !== 'feedback') return false;

        activity.feedbacks = [];
        this.saveActivity(activity);
        return true;
    }

    // 取得參與者總數
    static getParticipantCount(roomId) {
        const activity = this.getActivity(roomId);
        if (!activity) return 0;

        if (activity.type === 'qa' && activity.participants) {
            return Object.keys(activity.participants).length;
        } else if (activity.type === 'feedback' && activity.feedbacks) {
            // 回饋模式下，統計提交過回饋的參與者（簡化處理）
            return activity.feedbacks.length;
        }
        return 0;
    }
}

