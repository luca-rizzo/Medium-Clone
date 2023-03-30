import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { FollowerServiceWS } from './follower.service-ws';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor(private readonly _followerServiceWs: FollowerServiceWS) { }

  followButtonClicked(userProfile: Profile): Observable<{profile: Profile}>{
    return userProfile.following ? 
    this._followerServiceWs.unfollowProfile(userProfile) : 
    this._followerServiceWs.followProfile(userProfile);
  }
}
