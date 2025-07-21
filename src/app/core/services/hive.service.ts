import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hive } from '../../models/hive/hive.model';

export interface HiveSummary {
  totalHives: number;
  activeHives: number;
  passiveHives: number;
  totalHoney: number;
}

@Injectable({
  providedIn: 'root'
})
export class HiveService {
  private apiUrl = 'https://localhost:7033/api/hives';  // Backend hive API endpoint
  
  constructor(private http: HttpClient) { }

  // Tüm kovanları getir
  getAllHives(): Observable<Hive[]> {
    return this.http.get<Hive[]>(this.apiUrl);
  }

  // Id'ye göre kovan getir
  getHiveById(id: string): Observable<Hive> {
    return this.http.get<Hive>(`${this.apiUrl}/${id}`);
  }

  // Yeni kovan oluştur
  createHive(hive: Partial<Hive>): Observable<Hive> {
    return this.http.post<Hive>(this.apiUrl, hive);
  }

  // Var olan kovani güncelle
  updateHive(id: string, hive: Partial<Hive>): Observable<Hive> {
    return this.http.put<Hive>(`${this.apiUrl}/${id}`, hive);
  }

  // Kovan sil
  deleteHive(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Kovan özet bilgisi getir
  getSummary(): Observable<HiveSummary> {
    return this.http.get<HiveSummary>(`${this.apiUrl}/summary`);
  }
}
