// Utils/similarProfilesUtils.ts
import { extractUserInformation, fetchUsersByLocation } from '../services/githubApi';
import { User } from '../types';

export const findSimilarProfiles = async (user: User, page: number): Promise<User[]> => {
   try {
      console.log('Начинаем поиск похожих профилей');
      const { location, repositories } = await extractUserInformation(user);
      console.log('Информация о пользователе успешно извлечена');

      // Определяем среднее количество репозиториев пользователя
      const averageRepos = repositories.length; // Примерное среднее значение
      console.log('Среднее количество репозиториев:', averageRepos);

      // Вычисляем диапазон значений для количества репозиториев
      const minRepos = Math.max(1, Math.round(averageRepos - 10)); // Примерно среднее значение - 5
      const maxRepos = Math.round(averageRepos + 10); // Примерно среднее значение + 5
      console.log('Диапазон количества репозиториев:', minRepos, '-', maxRepos);

      // Определяем среднее количество фолловеров пользователя
      const averageFollowers = user.followers;
      console.log('Среднее количество фолловеров:', averageFollowers);

      // Вычисляем диапазон значений для количества фолловеров
      const minFollowers = Math.max(0, Math.round(averageFollowers - 10)); // Примерно среднее значение - 10
      const maxFollowers = Math.round(averageFollowers + 10); // Примерно среднее значение + 10
      console.log('Диапазон количества фолловеров:', minFollowers, '-', maxFollowers);

      // Получаем пользователей по местоположению, языку и приблизительным значениям количества репозиториев и фолловеров
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
