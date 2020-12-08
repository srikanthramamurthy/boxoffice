import BaseService from './BaseService';
import IMovieDetails from '../common/types/IMovieDetails';
import {IMovie} from '../common/types/IMovie';

class BoxOfficeService extends BaseService {

  async getMovieById(source: string,movieId: string): Promise<IMovieDetails> {
    return await this.get(`/${source}/movie/${movieId}`);
  }

  async getMovies(source: string): Promise<IMovie[]> {
    return await this.get(`/${source}/movies`);
  }

}

const service = new BoxOfficeService();

export default service;
