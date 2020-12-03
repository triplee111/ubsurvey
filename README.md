# ubsurvey

ID: 4211 優博 會員問卷

## docker 版本啟動步驟

### 安裝 Docker

作業系統安裝 docker，安裝方式可參考 [get-docker](https://docs.docker.com/get-docker/)

### 啟動容器

一樣在專案目錄底下，執行

```bash
docker-compose up -d
```

當本地尚未存在目標 IMAGE 時，此步驟會同時執行 docker pull {IMAGE}

預設 container name 為 .env 檔案裡定義的 APP_NAME，此一步驟會建立一個含有目前專案的開發環境

### 執行開發指令

可執行(專案目錄底下)

```bash
docker-compose exec dev npm run serve # node
# or
docker-compose exec dev yarn serve # yarn
```

或是執行(不限定於專案目錄)

```bash
docker exec -it {CONTAINER} npm run serve # node
# or
docker exec -it {CONTAINER} yarn serve # yarn
```

若要連接測試站後端則是執行 serve:staging

```bash
docker-compose exec dev npm run serve:staging # node
# or
docker-compose exec dev yarn serve:staging # yarn
```

### 更新鏡像

當 vact-nest 有版本更新時，可執行以下指令更新鏡像(專案目錄底下)

```bash
docker-compose pull dev
```

或是執行(不限定於專案目錄)

```bash
docker pull {IMAGE}:{TAG} # TAG 請與 .env 中的設定一致
```

更新完畢後，如果本地已有相同 TAG 的舊鏡像，其 TAG 將會轉為 unknown

如果有容器是以該鏡像啟動，請先執行

```bash
docker-compose up -d
```

再以新的鏡像重啟專案容器，至於轉為 unknown tag 的舊鏡像移除即可

### 停止容器

開發持續進行時，不需要停止或移除容器，但要注意一點

容器預設的 mapping port 只有 8080，當內部的 8080 port 在被使用的情況下，再次執行 run serve，vue-cli 預設便會推送到 8081，但實際上瀏覽器開啟的專案永遠是 8080 port 的程序(因為不存在 8081 的對外 mapping)

port mapping 錯誤不會影響開發，但會造成開發模式(mock or staging)無法切換，一旦發現使用的 port 跑掉，可重新啟動容器，不需要移除

```bash
docker-compose restart

```
