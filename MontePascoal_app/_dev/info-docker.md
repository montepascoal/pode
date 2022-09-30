### Build Image

docker build -t system/montepascoal_system .

### Deploy Compose (for CREATE repository)

docker-compose up

finish

### Deploy Service

docker stack deploy -c docker-compose.yml montepascoal_system

### Remove Deploy 

docker stack rm montepascoal_system

### View Services

docker services ls

### Copy by SSH

scp -r -P 22 app@192.168.0.35:/home/app/system/montepascoal-system/ ./montepascoal-system

( Not copy .files )
