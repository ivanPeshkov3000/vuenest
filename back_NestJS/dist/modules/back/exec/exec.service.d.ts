import { CommandDto } from './dto/privateApiCommand.dto';
import { CreateExecInput } from './dto/create-exec.input';
import { UpdateExecInput } from './dto/update-exec.input';
export declare class ExecService {
    create(createExecInput: CreateExecInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateExecInput: UpdateExecInput): string;
    remove(id: number): string;
    getCommands(query: CommandDto): string;
    printCommand(command: any, value: any): string;
}
