import { ExecService } from './exec.service';
import { CreateExecInput } from './dto/create-exec.input';
import { UpdateExecInput } from './dto/update-exec.input';
import { CommandDto } from './dto/privateApiCommand.dto';
export declare class ExecResolver {
    private readonly execService;
    constructor(execService: ExecService);
    getCommand(query: CommandDto): string;
    createExec(createExecInput: CreateExecInput): string;
    findAll(): string;
    findOne(id: number): string;
    updateExec(updateExecInput: UpdateExecInput): string;
    removeExec(id: number): string;
}
