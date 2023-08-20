import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {

  findUserCommentsById(userId: string) {
    return 'this is the comments of the user';
  }

}
