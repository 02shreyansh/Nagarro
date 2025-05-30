import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Trophy, Star, Target, Zap, Crown, Award, Flame, Calendar, TrendingUp } from 'lucide-react';

export interface EarnedBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earnedDate: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UpcomingReward {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  currentProgress: number;
  targetProgress: number;
  color: string;
  category: string;
}

const RewardsDashboard = () => {
  const userStats = {
    totalPoints: 12750,
    currentStreak: 15,
    level: 8,
    nextLevelPoints: 15000,
    badges: 24
  };

  const earnedBadges: EarnedBadge[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first challenge',
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-yellow-500',
      earnedDate: '2024-05-15',
      rarity: 'common'
    },
    {
      id: '2',
      name: 'Streak Master',
      description: '10 day consecutive streak',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-orange-500',
      earnedDate: '2024-05-20',
      rarity: 'rare'
    },
    {
      id: '3',
      name: 'Point Collector',
      description: 'Earned 10,000 points',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-purple-500',
      earnedDate: '2024-05-25',
      rarity: 'epic'
    },
    {
      id: '4',
      name: 'Rising Star',
      description: 'Reached level 5',
      icon: <Crown className="w-6 h-6" />,
      color: 'bg-blue-500',
      earnedDate: '2024-05-28',
      rarity: 'rare'
    },
    {
      id: '5',
      name: 'Champion',
      description: 'Complete 50 challenges',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-green-500',
      earnedDate: '2024-05-30',
      rarity: 'legendary'
    },
    {
      id: '6',
      name: 'Consistency King',
      description: 'Complete daily goals for a week',
      icon: <Flame className="w-6 h-6" />,
      color: 'bg-indigo-500',
      earnedDate: '2024-05-22',
      rarity: 'common'
    }
  ];

  const upcomingRewards: UpcomingReward[] = [
    {
      id: '1',
      name: 'Speed Demon',
      description: 'Complete 5 challenges in under 1 hour',
      icon: <Zap className="w-5 h-5" />,
      currentProgress: 3,
      targetProgress: 5,
      color: 'bg-yellow-400',
      category: 'Speed'
    },
    {
      id: '2',
      name: 'Power User',
      description: 'Reach 15,000 total points',
      icon: <TrendingUp className="w-5 h-5" />,
      currentProgress: 12750,
      targetProgress: 15000,
      color: 'bg-blue-400',
      category: 'Points'
    },
    {
      id: '3',
      name: 'Dedication',
      description: 'Maintain a 30-day streak',
      icon: <Flame className="w-5 h-5" />,
      currentProgress: 15,
      targetProgress: 30,
      color: 'bg-red-400',
      category: 'Streak'
    },
    {
      id: '4',
      name: 'Explorer',
      description: 'Try 10 different challenge types',
      icon: <Target className="w-5 h-5" />,
      currentProgress: 7,
      targetProgress: 10,
      color: 'bg-green-400',
      category: 'Variety'
    }
  ];

  const motivationalMessages = [
    "🔥 You're on fire! Keep that streak going!",
    "⭐ Amazing progress! You're almost at the next level!",
    "🚀 Your dedication is paying off!",
    "💪 Champions are made through consistency!",
    "🎯 Focus on your goals - you've got this!"
  ];

  const getRandomMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const levelProgress = (userStats.totalPoints / userStats.nextLevelPoints) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
              <AvatarImage src="/api/placeholder/64/64" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold">
                L{userStats.level}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900">Rewards Dashboard</h1>
              <p className="text-lg text-gray-600">Level {userStats.level} • {userStats.badges} Badges Earned</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
                <div className="text-sm opacity-90">Total Points</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold flex items-center justify-center">
                  <Flame className="w-6 h-6 mr-1" />
                  {userStats.currentStreak}
                </div>
                <div className="text-sm opacity-90">Day Streak</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{userStats.level}</div>
                <div className="text-sm opacity-90">Current Level</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{userStats.badges}</div>
                <div className="text-sm opacity-90">Badges Earned</div>
              </CardContent>
            </Card>
          </div>

          {/* Level Progress */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Level {userStats.level} Progress</span>
                  <span className="text-sm text-gray-600">
                    {userStats.totalPoints.toLocaleString()} / {userStats.nextLevelPoints.toLocaleString()} points
                  </span>
                </div>
                <Progress value={levelProgress} className="h-3" />
                <div className="text-center text-sm text-purple-600 font-medium">
                  {userStats.nextLevelPoints - userStats.totalPoints} points to Level {userStats.level + 1}!
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivational Message */}
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="text-center text-lg font-medium text-gray-800">
                {getRandomMessage()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earned Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>Earned Badges</span>
              <Badge variant="secondary" className="ml-2">{earnedBadges.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {earnedBadges.map((badge) => (
                <Card 
                  key={badge.id} 
                  className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 cursor-pointer group"
                >
                  <CardContent className="p-4 text-center space-y-3">
                    <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center text-white mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {badge.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                    </div>
                    <div className="space-y-2">
                      <Badge className={`text-xs ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-gray-500">
                        Earned: {new Date(badge.earnedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                      <Award className="w-8 h-8" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Rewards Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-green-500" />
              <span>Upcoming Rewards</span>
              <Badge variant="outline" className="ml-2">{upcomingRewards.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingRewards.map((reward) => {
                const progressPercentage = (reward.currentProgress / reward.targetProgress) * 100;
                return (
                  <Card 
                    key={reward.id} 
                    className="hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-12 h-12 ${reward.color} rounded-lg flex items-center justify-center text-white shadow-sm`}>
                            {reward.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {reward.category}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">
                            {reward.currentProgress.toLocaleString()} / {reward.targetProgress.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="text-right text-xs text-gray-500">
                          {Math.round(progressPercentage)}% complete
                        </div>
                      </div>

                      {progressPercentage >= 80 && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-2">
                          <div className="text-sm text-green-800 font-medium text-center">
                            🎯 Almost there! Keep pushing!
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RewardsDashboard;