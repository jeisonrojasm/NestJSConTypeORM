import { Module, Global } from '@nestjs/common';

const varToUseGlobally = `I'm the global variable`;

@Global()
@Module({
    providers: [
        {
            provide: 'varToUseGlobally',
            useValue: varToUseGlobally
        }
    ],
    exports: ['varToUseGlobally']
})
export class DatabaseModule { }

