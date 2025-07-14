### 🎯 PROMPT — “Generate Angular 20 API + Models From `openapi.json`”

You are an expert code-gen assistant.  
Based on the OpenAPI 3.0 document found at `src/resources/openapi.json`, produce idiomatic Angular 20 TypeScript that meets the guidelines below.

---

#### 1  Code-organisation rules  

| Concern | Requirement |
|---------|-------------|
|base layer| Create a thin ApiService base layer|
| **Grouping** | Use the `tags` array on each path operation. Everything that shares the same tag lives in *one* folder/module. |
| **File layout** | *For each tag* create:  <br>• `<tag>/<tag>.models.ts` → every schema used by that group  <br>• `<tag>/<tag>.resource.ts` → all **GET** endpoints via `httpResource()` (one per endpoint)  <br>• `<tag>/<tag>.api.service.ts` → all mutating endpoints (**POST / PUT / PATCH / DELETE**) implemented with `HttpClient` |
| **Barrel export** | Generate an `index.ts` inside each tag folder that re-exports the models and service. |

```typescript
import { httpResource } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, @Inject(API_CONFIG) private cfg: ApiConfig) {}

  apiGetResource<T>(
    path: string | Signal<string>,
    params?: Signal<HttpParams | undefined>
  ) {
    const cfg = inject<ApiConfig>(API_CONFIG);

    return httpResource<T>(() => ({
      url: `${cfg.baseUrl}${typeof path === 'string' ? path : path()}`,
      method: 'GET',
      params: params?.()
    }));
  }
  
  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.cfg.baseUrl}${url}`, { params });
  }
  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.cfg.baseUrl}${url}`, body);
  }
  put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.cfg.baseUrl}${url}`, body);
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.cfg.baseUrl}${url}`);
  }
}
```
---

#### 2  HTTP style guide  

| Operation type | Use | Notes |
|----------------|-----|-------|
| `GET` (and `HEAD`) | `httpResource(() => '/url')` | GET method is **implicit**. Inject no body. Return type is the *resolved* payload (not `HttpResponse`). |
| `POST`, `PUT`, `PATCH`, `DELETE` | `HttpClient` methods inside the `<tag>.api.service.ts` | Return typed `Observable<TResponse>`; include `{ observe:'body' }` by default. |

*Never* mix the two approaches in the same function.

---

#### 3  Models & typing  
* shared models go into `src/app/api/shared/`, for Error, Pagination, etc.
* Translate every *schema component* referenced by the tag’s operations into a **TypeScript `interface`** (or `type` when it would read better).  
* Preserve property names as-is (`snake_case` → `snake_case`).  
* Inline enums become `type` unions (`export type Status = 'pending' | 'done'`).  
* Re-use definitions across groups by importing from the first group that declared them.  
* Add `readonly` where the API marks a property as `readOnly:true`.

---

#### 4  Best-practice details  

* Decorate each service with `@Injectable({ providedIn:'root' })`.  
* Constructor inject only `HttpClient` and nothing else.  
* Add one method per endpoint, named in **verb-object** form, e.g. `createUser`, `updateInvoice`, `deleteTag`.  
* Wrap every mutating call in `firstValueFrom()` **inside** the service if the OpenAPI spec marks the response as non-streaming.  
* Use generics for paged endpoints:  
  ```ts
  export interface Page<T> { items:T[]; total:number; page:number; size:number; }
````

* Include a short **JSDoc** above each method with the operationId and summary from the spec.
* Do **not** add additional business logic, state management, or UI code.

