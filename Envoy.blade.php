@servers(['remote' => 'davidian2', 'localhost' => '127.0.0.1'])

@story('deploy')
    git_push
	remote_deploy
@endstory

@task('git_push', ['on' => 'localhost'])
    git push origin main
@endtask

@task('remote_deploy', ['on' => ['remote']])
    cd ~/auth.davidiantoday.org
    git pull origin main
    yarn install
    yarn build
    pm2 start
@endtask