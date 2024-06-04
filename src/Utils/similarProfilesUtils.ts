// Utils/similarProfilesUtils.ts
import { extractUserInformation, fetchUsersByLocation } from '../services/githubApi';
import { User } from '../types';

export const findSimilarProfiles = async (user: User, page: number): Promise<User[]> => {
   try {
      console.log('Начинаем поиск похожих профилей');
      const { location, repositories } = await extractUserInformation(user);
      console.log('Информация о пользователе успешно извлечена');

      const averageRepos = repositories.length; 
      console.log('Среднее количество репозиториев:', averageRepos);

      const minRepos = Math.max(1, Math.round(averageRepos - 40)); 
      const maxRepos = Math.round(averageRepos + 40); 
      console.log('Диапазон количества репозиториев:', minRepos, '-', maxRepos);

      const averageFollowers = user.followers;
      console.log('Среднее количество фолловеров:', averageFollowers);

      const minFollowers = Math.max(0, Math.round(averageFollowers - 50)); 
      const maxFollowers = Math.round(averageFollowers + 50); 
      console.log('Диапазон количества фолловеров:', minFollowers, '-', maxFollowers);

      console.log('Начинаем поиск пользователей');

      if (user.language === 'TypeScript' || user.language === 'JavaScript') {
         user.language = `JavaScript+OR+language:TypeCript`
         console.log('Значит ищем по: JavaScript + Typecript');
      }

      const users = await fetchUsersByLocation(location || null, user.language, minRepos, maxRepos, minFollowers, maxFollowers, page);
      console.log('Найдено пользователей:', users.length);
      if (users.length === 0) {
         alert('пользователи закончились');
      }

      return users;
   } catch (error) {
      console.error('Ошибка при поиске похожих профилей:', error);
      throw error;
   }
};
