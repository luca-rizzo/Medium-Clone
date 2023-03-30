import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FOLLOW_PROFILE_ENDPOINT } from '../endpoints/endpoints';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class FollowerServiceWS {

  constructor(private readonly _httpClient: HttpClient) { }

  followProfile(profile: Profile){
    const url = environment.api_url.concat(FOLLOW_PROFILE_ENDPOINT).replace(':username', profile.username);
    return this._httpClient.post<{profile: Profile}>(url, {});
  }

  unfollowProfile(profile: Profile){
    const url = environment.api_url.concat(FOLLOW_PROFILE_ENDPOINT).replace(':username', profile.username);
    return this._httpClient.delete<{profile: Profile}>(url, {});
  }
}
