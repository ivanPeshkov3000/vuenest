"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const post_model_1 = require("../../models/post.model");
let PostsService = class PostsService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    create(createPostDto) {
        const Post = {
            title: createPostDto.title,
            url: createPostDto.url,
            content: "hey ho!",
            author: "inkognito"
        };
        return Post;
    }
    findOneById(id) {
        const post = this.postRepository.findOne({ where: { id } });
        return post;
    }
    findAll() {
        return this.postRepository.findAll();
    }
    findAllofTitle(title) {
        const posts = this.postRepository.findAll({ where: { title } });
        return posts;
    }
    findAllofContent(content) {
        const posts = this.postRepository.findAll({ where: { content } });
        return posts;
    }
    findAllofDate(date) {
        const posts = this.postRepository.findAll({ where: { date } });
        return posts;
    }
    async updatePost(id, updatePostDto) {
        return await this.postRepository.update(updatePostDto, { where: { id } });
    }
    async removePost(id) {
        return await this.postRepository.destroy({ where: { id } });
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(post_model_1.Post)),
    __metadata("design:paramtypes", [Object])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map