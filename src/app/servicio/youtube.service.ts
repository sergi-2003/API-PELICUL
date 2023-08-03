import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey: string = 'AIzaSyCxRcqcaCfa9t1KC3ajp0-rh9Ks_ZMr-yo';
  private apiUrl: string = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) { }

  searchVideos(query: string, maxResults: number) {
    const url = `${this.apiUrl}/search?key=${this.apiKey}&q=${query}&part=snippet&type=video&maxResults=${maxResults}`;
    return this.http.get(url);
  }
}