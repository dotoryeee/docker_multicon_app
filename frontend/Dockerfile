FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build
#여기까지 nginx에서 사용할 파일을 build합니다

#Nginx를 가동하고 윗 단계에서 생성한 빌드파일들을 nginx에 복사합니다
FROM nginx
EXPOSE 3000
#nginx 컨테이너가 3000번 포트를 listen 하도록 합니다
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
#default.conf설정파일 미리 만들고 nginx컨테이너 안에 적용하도록 복사합니다
COPY --from=builder /app/build /usr/share/nginx/html
#빌드가 완료된 파일을 Nginx 루트 폴더에 복사합니다