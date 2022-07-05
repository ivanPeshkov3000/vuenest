import { FrontService } from './front.service';
export declare class FrontController {
    private readonly frontService;
    constructor(frontService: FrontService);
    getPage(page: string): string;
}
