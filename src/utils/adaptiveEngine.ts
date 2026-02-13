import { Student, LearningPath, Skill, Subject } from '@/data/mockData';

export interface Recommendation {
  type: 'path' | 'skill_focus' | 'review' | 'challenge';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  reason: string;
  estimatedImpact: string;
  actionItems: string[];
  relatedSubject?: string;
}

export interface LearningGap {
  skill: Skill;
  subject: string;
  priority: 'critical' | 'attention' | 'monitoring';
  reason: string;
}

/**
 * Adaptive Learning Path Recommendation Engine
 * 
 * Analyzes student data to generate personalized recommendations
 */
export class AdaptiveLearningEngine {
  private student: Student;

  constructor(student: Student) {
    this.student = student;
  }

  /**
   * Generate comprehensive learning recommendations
   */
  generateRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Check for struggling areas
    const gaps = this.identifyLearningGaps();
    gaps.forEach(gap => {
      recommendations.push({
        type: 'skill_focus',
        priority: gap.priority === 'critical' ? 'high' : 'medium',
        title: `Focus on ${gap.skill.name}`,
        description: `${gap.skill.name} in ${gap.subject} needs attention. Current progress: ${gap.skill.progress}%.`,
        reason: gap.reason,
        estimatedImpact: 'Improve foundational skills for advanced topics',
        actionItems: [
          `Complete ${gap.skill.totalModules - gap.skill.completedModules} remaining modules`,
          'Schedule 20-minute daily practice sessions',
          'Review prerequisite concepts'
        ],
        relatedSubject: gap.subject
      });
    });

    // Recommend next learning paths
    const pathRecommendations = this.recommendLearningPaths();
    recommendations.push(...pathRecommendations);

    // Suggest review for mastered skills with low streak
    const reviewRecommendations = this.suggestSkillReviews();
    recommendations.push(...reviewRecommendations);

    // Challenge recommendations for strong areas
    const challengeRecommendations = this.suggestChallenges();
    recommendations.push(...challengeRecommendations);

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  /**
   * Identify learning gaps that need attention
   */
  identifyLearningGaps(): LearningGap[] {
    const gaps: LearningGap[] = [];

    this.student.subjects.forEach(subject => {
      subject.skills.forEach(skill => {
        // Critical: Skills with low progress and no recent practice
        if (skill.progress < 30 && skill.streakDays === 0) {
          gaps.push({
            skill,
            subject: subject.name,
            priority: 'critical',
            reason: `No progress in ${skill.name} for over a week. Foundation needed for upcoming topics.`
          });
        }
        // Attention: Skills stalled in progress
        else if (skill.progress >= 30 && skill.progress < 70 && skill.streakDays < 2) {
          gaps.push({
            skill,
            subject: subject.name,
            priority: 'attention',
            reason: `Progress stalled at ${skill.progress}%. Consistent practice needed.`
          });
        }
        // Monitoring: Recently mastered but low streak
        else if (skill.level === 'mastered' && skill.streakDays === 0) {
          gaps.push({
            skill,
            subject: subject.name,
            priority: 'monitoring',
            reason: 'Skill mastered but needs review to maintain proficiency'
          });
        }
      });
    });

    return gaps;
  }

  /**
   * Recommend learning paths based on current progress and goals
   */
  recommendLearningPaths(): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Find nearly completed paths (encourage completion)
    const nearlyComplete = this.student.learningPaths.filter(
      p => p.completionRate >= 50 && p.completionRate < 100
    );

    nearlyComplete.forEach(path => {
      const remainingModules = path.modules.filter(m => !m.completed).length;
      recommendations.push({
        type: 'path',
        priority: 'high',
        title: `Complete "${path.title}"`,
        description: `You're ${path.completionRate}% through this path. Only ${remainingModules} modules remaining!`,
        reason: 'Nearing completion - finishing will unlock advanced content and solidify understanding',
        estimatedImpact: 'Complete foundational knowledge in ' + path.subject,
        actionItems: [
          `Complete the next module: "${path.modules.find(m => !m.completed && !m.locked)?.title}"`,
          `Dedicate ${path.estimatedHours * (1 - path.completionRate / 100)} hours to finish`,
          'Schedule completion before end of week'
        ],
        relatedSubject: path.subject
      });
    });

    // Suggest new paths based on mastered skills
    const masteredSkills = this.getMasteredSkills();
    const availablePaths = this.student.learningPaths.filter(p => p.completionRate === 0);

    availablePaths.slice(0, 2).forEach(path => {
      recommendations.push({
        type: 'path',
        priority: 'medium',
        title: `Start "${path.title}"`,
        description: path.description,
        reason: 'Builds on your current knowledge and expands into new areas',
        estimatedImpact: `Gain ${path.modules.length} new skills over ${path.estimatedHours} hours`,
        actionItems: [
          'Watch the introduction video',
          'Complete the first module',
          'Set a weekly goal for this path'
        ],
        relatedSubject: path.subject
      });
    });

    return recommendations;
  }

  /**
   * Suggest skill reviews for maintenance
   */
  suggestSkillReviews(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const masteredSkills = this.getMasteredSkills();

    // Find mastered skills that haven't been practiced recently
    const skillsNeedingReview = masteredSkills.filter(
      s => s.streakDays === 0 && new Date(s.lastPracticed) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    if (skillsNeedingReview.length >= 3) {
      recommendations.push({
        type: 'review',
        priority: 'low',
        title: 'Weekly Review Session',
        description: `Review ${skillsNeedingReview.length} mastered skills to maintain proficiency`,
        reason: 'Spaced repetition improves long-term retention',
        estimatedImpact: 'Maintain 90%+ retention of mastered skills',
        actionItems: [
          'Schedule 30-minute review session',
          'Focus on skills not practiced in 7+ days',
          'Complete quick practice problems'
        ]
      });
    }

    return recommendations;
  }

  /**
   * Suggest challenge activities for strong areas
   */
  suggestChallenges(): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Find subjects with high performance
    const strongSubjects = this.student.subjects.filter(s => s.overallProgress >= 80);

    strongSubjects.forEach(subject => {
      const masteredCount = subject.skills.filter(s => s.level === 'mastered').length;
      if (masteredCount >= 2) {
        recommendations.push({
          type: 'challenge',
          priority: 'low',
          title: `${subject.name} Challenge`,
          description: `Take on advanced ${subject.name} problems to push your understanding further`,
          reason: `Strong performance in ${subject.name} indicates readiness for challenges`,
          estimatedImpact: 'Develop deeper mastery and problem-solving skills',
          actionItems: [
            `Try advanced ${subject.name} practice problems`,
            'Attempt a project-based assessment',
            'Help peers who are struggling with these concepts'
          ],
          relatedSubject: subject.name
        });
      }
    });

    return recommendations;
  }

  /**
   * Generate a weekly study plan
   */
  generateWeeklyPlan(): { day: string; focus: string; estimatedMinutes: number; reason: string }[] {
    const gaps = this.identifyLearningGaps();
    const criticalGap = gaps.find(g => g.priority === 'critical');
    const attentionGaps = gaps.filter(g => g.priority === 'attention');
    const strongSubjects = this.student.subjects.filter(s => s.overallProgress >= 70);

    const plan = [
      {
        day: 'Monday',
        focus: criticalGap ? `${criticalGap.subject}: ${criticalGap.skill.name}` : 'Review week ahead',
        estimatedMinutes: 30,
        reason: criticalGap ? 'Address critical learning gap' : 'Plan and organize'
      },
      {
        day: 'Tuesday',
        focus: attentionGaps[0] ? `${attentionGaps[0].subject}: ${attentionGaps[0].skill.name}` : strongSubjects[0]?.name || 'General practice',
        estimatedMinutes: 25,
        reason: attentionGaps[0] ? 'Continue skill development' : 'Maintain strength'
      },
      {
        day: 'Wednesday',
        focus: 'Active learning path',
        estimatedMinutes: 35,
        reason: 'Progress on structured learning'
      },
      {
        day: 'Thursday',
        focus: attentionGaps[1] ? `${attentionGaps[1].subject}: ${attentionGaps[1].skill.name}` : strongSubjects[1]?.name || 'Practice problems',
        estimatedMinutes: 25,
        reason: 'Balanced skill development'
      },
      {
        day: 'Friday',
        focus: 'Review and assessment',
        estimatedMinutes: 20,
        reason: 'Weekly checkpoint and reflection'
      },
      {
        day: 'Saturday',
        focus: 'Project work or challenge',
        estimatedMinutes: 45,
        reason: 'Apply knowledge in creative ways'
      },
      {
        day: 'Sunday',
        focus: 'Rest or light review',
        estimatedMinutes: 15,
        reason: 'Recovery and spaced repetition'
      }
    ];

    return plan;
  }

  /**
   * Get all mastered skills
   */
  private getMasteredSkills(): Skill[] {
    return this.student.subjects.flatMap(s => s.skills.filter(sk => sk.level === 'mastered'));
  }

  /**
   * Calculate predicted completion date for a path
   */
  predictCompletionDate(path: LearningPath): Date {
    const remainingHours = path.estimatedHours * (1 - path.completionRate / 100);
    const avgDailyHours = this.student.weeklyCompletedHours / 7;
    const daysToComplete = avgDailyHours > 0 ? Math.ceil(remainingHours / avgDailyHours) : remainingHours * 2;
    
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + daysToComplete);
    return completionDate;
  }

  /**
   * Generate confidence score for recommendations
   */
  calculateConfidenceScore(recommendation: Recommendation): number {
    let score = 0.7; // Base confidence

    // Adjust based on data availability
    if (recommendation.relatedSubject) {
      const subject = this.student.subjects.find(s => s.name === recommendation.relatedSubject);
      if (subject) {
        // More data = higher confidence
        const dataPoints = subject.skills.length + this.student.learningPaths.filter(p => p.subject === subject.name).length;
        score += Math.min(dataPoints * 0.05, 0.2);
      }
    }

    // Adjust based on recommendation type
    switch (recommendation.type) {
      case 'skill_focus':
        score += 0.1; // High confidence for skill gaps
        break;
      case 'path':
        score += 0.05; // Medium confidence for path recommendations
        break;
      case 'review':
        score += 0.08; // High confidence for review timing
        break;
      case 'challenge':
        score -= 0.05; // Lower confidence for challenges
        break;
    }

    return Math.min(Math.max(score, 0), 1);
  }
}

// Factory function for easy usage
export function createAdaptiveEngine(student: Student): AdaptiveLearningEngine {
  return new AdaptiveLearningEngine(student);
}
