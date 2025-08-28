# k8s에서 fluent-bit 가 수집한로그 파일로 저장하는 백앤드 시스템

# 사용스펙
>   노드/express

## 내용
>   pvc 볼륨 마운트를 잡어서 사용. 앱에서는 /log 를 만듬
>   마운트는 var/log/aiagent-log 디렉토리
>   pod의 메타데이터 app 네임으로 폴더 생성
>   여러대의 fluent-bit가  해당 백앤드 한대에 전부요청


## 예시 디렉토리
│
├── 📁 aiagent-api/               #pod의 메타데이터 네임    
│   ├── access-20250823.log         
│   ├── error-0250824.log       
│   └── access-20250825.log           
├── 📁 aiagent/                  #pod의 메타데이터 네임    
│   ├── access-20250823.log         
│   └── access-20250825.log      



#  출력내용
## 생각하기에 시간표시를 조금 더 알맞게 바꿔도됨
>   [25/Aug/2025:14:10:45 밀리언세컨트표시 +0900] [podId] stdout "app에서 출력한내용 그상태로 여기에 출력"
>   [25/Aug/2025:14:12:45 밀리언세컨트표시 +0900] [podId] stdout "app에서 출력한내용 그상태로 여기에 출력"

