cd C:\Users\hp\awall\awallbackend
echo #!/usr/bin/env bash > build.sh
echo set -o errexit >> build.sh
echo pip install -r requirements.txt >> build.sh
echo python manage.py collectstatic --no-input >> build.sh
echo python manage.py migrate >> build.sh