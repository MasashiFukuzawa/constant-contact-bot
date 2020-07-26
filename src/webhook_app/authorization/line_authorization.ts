export class LineAuthorization {
  private accessToken: string | null;
  private headers: {[key: string]: string} | null;
  private userId: string | null;
  constructor() {
    this.accessToken = null;
    this.headers = null;
    this.userId = null;
  }

  getAccessToken(): string {
    if (this.accessToken) return this.accessToken;
    this.setAccessToken();
    return this.accessToken;
  }

  getHeaders(): {[key: string]: string} {
    if (this.headers) return this.headers;
    this.setHeaders();
    return this.headers;
  }

  getUserId(): string {
    if (this.userId) return this.userId;
    this.setUserId();
    return this.userId;
  }

  private setAccessToken(): void {
    this.accessToken =
      PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");
  }

  private setHeaders(): void {
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessToken()}`
    };
  }

  private setUserId(): void {
    this.userId =
      PropertiesService.getScriptProperties().getProperty("USER_ID");
  }
}