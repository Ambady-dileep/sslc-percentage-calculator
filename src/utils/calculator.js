import { GRADES, MAX_POINTS, TOTAL_SUBJECTS } from '../constants/grades';

export const calculatePercentage = (gradeCounts) => {
  let totalPoints = 0;
  let totalCount = 0;

  Object.entries(gradeCounts).forEach(([gradeLabel, count]) => {
    const grade = GRADES.find((g) => g.label === gradeLabel);
    if (grade) {
      totalPoints += grade.points * count;
      totalCount += count;
    }
  });

  if (totalCount !== TOTAL_SUBJECTS) {
    throw new Error(`Total subjects must be exactly ${TOTAL_SUBJECTS}`);
  }

  const percentage = (totalPoints / MAX_POINTS) * 100;
  
  return {
    percentage: Number(percentage.toFixed(2)),
    totalPoints
  };
};

export const getPerformanceMessage = (percentage) => {
  if (percentage >= 90) return { title: 'Outstanding Performance!', message: 'You have achieved excellence.', color: 'text-indigo-600' };
  if (percentage >= 75) return { title: 'Great Job!', message: 'Your hard work paid off.', color: 'text-blue-600' };
  if (percentage >= 50) return { title: 'Good Effort!', message: 'Keep pushing forward.', color: 'text-teal-600' };
  return { title: 'Keep Improving!', message: 'Every step counts towards success.', color: 'text-orange-600' };
};
