@servers(['remote' => 'kredifasilauth', 'localhost' => '127.0.0.1'])

@story('deploy')
    git_push
	remote_deploy
@endstory

@task('git_push', ['on' => 'localhost'])
    git push origin kredifasil
@endtask

@task('remote_deploy', ['on' => ['remote']])
    cd /var/www/html/connect
    git pull origin kredifasil
    yarn install
    yarn build
    pm2 start
@endtask