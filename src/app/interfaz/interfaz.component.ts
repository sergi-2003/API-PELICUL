import { Component } from '@angular/core';
import { YoutubeService } from '../servicio/youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css']
})
export class InterfazComponent {
  videos: any[] = [];
  query: string = '';
  maxResults: number = 10;

  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer) { }

  searchVideos() {
    if (this.query.trim() !== '') {
      this.youtubeService.searchVideos(this.query, this.maxResults)
        .subscribe(
          (response: any) => {
            this.videos = response.items;
          },
          (error: any) => {
            console.error('Error en YouTube videos:', error);
          }
        );
    } else {
      this.videos = [];
    }
  }

  ngOnInit() {
    this.loadRecommendedVideos();
  }

  loadRecommendedVideos() {
    // Puedes utilizar un término de búsqueda amplio o buscar por una categoría específica
    const searchTerm = 'musica';
    
    // Ejemplo: Cargar videos de música como sugeridos
    this.youtubeService.searchVideos(searchTerm, this.maxResults)
      .subscribe(
        (response: any) => {
          this.videos = response.items;
        },
        (error: any) => {
          console.error('Error en YouTube videos:', error);
        }
      );
  }

  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
  }


}
