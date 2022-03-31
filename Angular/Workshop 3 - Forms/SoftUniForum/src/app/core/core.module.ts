import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { LocalStorage } from './injection-tokens';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  providers: [
    {
      provide: LocalStorage,
      useFactory: (platformId: typeof PLATFORM_ID) => {
        if (isPlatformBrowser(platformId)) {
          return window.localStorage;
        }

        if (isPlatformServer(platformId)) {
          return class implements Storage {
            private data: Record<string, string> = {};
            length: number = 0;

            clear(): void {
              this.data = {};
            }

            getItem(key: string): string | null {
              return this.data[key];
            }

            key(index: number): string | null {
              throw new Error('Method not implemented.');
            }

            removeItem(key: string): void {
              const { [key]: removedItem, ...others } = this.data;
              this.data = others;
            }

            setItem(key: string, value: string): void {
              this.data[key] = value;
            }
          }
        }
        throw Error('ENVIRONMENT NOT SUPPORTED.')
      },
      deps: [PLATFORM_ID]
    }
  ]
})
export class CoreModule { }