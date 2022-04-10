import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AuthGuard } from "./guards/auth.guard";
import { JwtService } from "@nestjs/jwt";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    // global guard that blocks requests without jwt
    const reflector = app.get(Reflector);
    const jwtService = app.get(JwtService);
    app.useGlobalGuards(new AuthGuard(reflector, jwtService));

    const config = new DocumentBuilder()
        .setTitle("Fake instagram")
        .setDescription("Documentation REST API")
        .setVersion('1.0.0')
        .addTag('fake-instagram')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
}

start();