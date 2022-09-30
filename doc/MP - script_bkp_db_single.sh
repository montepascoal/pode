#!/bin/sh
bds=(
fmontepascoal_wp
)
for i in "${bds[@]}"; do
mkdir -p "/root/backup/bkp_mysql_new/$i"
now="$(date +'%d_%m_%Y_%H_%M_%S')"
filename="$i_$now".gz
backupfolder="/root/backup/bkp_mysql_new/$i"
fullpathbackupfile="$backupfolder/$filename"
logfile="$backupfolder/"backup_log_$i"$(date +'%Y_%m')".txt
echo "mysqldump iniciado as $(date +'%d-%m-%Y %H:%M:%S')" >> "$logfile"
mysqldump  --single-transaction --skip-events --skip-routines  --skip-triggers  --quick --lock-tables=false --default-character-set=utf8 $i | gzip > "$fullpathbackupfile"
echo "mysqldump terminado as $(date +'%d-%m-%Y %H:%M:%S')" >> "$logfile"
echo "operacao terminada as  $(date +'%d-%m-%Y %H:%M:%S')" >> "$logfile"
echo "*****************" >> "$logfile"
done
exit 0