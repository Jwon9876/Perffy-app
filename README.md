# Perffy-app

## Homebrew 설치

Homebrew: https://brew.sh/

 ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)```
 
 Terminal에서 위의 명령어를 실행하거나, Homebrew에서 명령어를 복사하여 실행하세요.
 
 Homebrew 설치 후 ```Warning: /opt/homebrew/bin is not in your PATH.```
 
 의 Warning이 나타난다면, 환경변수 설정이 되지 않은 것이므로, 아래의 명령어를 실행하여 설정해줍니다.
 
 
```echo 'export PATH=/opt/homebrew/bin:$PATH' >> ~/.zshrc```

```source ~/.zshrc```

## Nodejs 설치

Nodejs: https://nodejs.org/

```brew install node```

brew install을 통해 node를 설치해줍니다.

## Install Watchman

Watchman: https://facebook.github.io/watchman/

```brew install watchman```

brew install을 통해 watchman 설치해줍니다.

## Install React Native CLI

```npm install -g react-native-cli```

npm install을 통해 React Native CLI 설치해줍니다.

## Clone한 프로젝트 디렉터리 내에서

```npm install```

명령어를 실행시켜줍니다.

## Pod install

iOS Simlator를 실행시키기 위해, ```/ios``` 디렉터리 내에서 pod install을 해줍니다.


## #M1 Issue
/ios 디렉토리에서 pod install 시 에러 발생 아래의 에러가 발생할 수 있습니다.

```
[NOTE]
You may have encountered a bug in the Ruby interpreter or extension libraries.
Bug reports are welcome.
For details: https://www.ruby-lang.org/bugreport.html

[IMPORTANT]
Don't forget to include the Crash Report log file under
DiagnosticReports directory in bug reports.

zsh: abort      pod install
```

아래의 명령어들을 실행시키면, 위의 발생한 에러를 해결할 수 있습니다.
``` sudo arch -x86_64 gem install ffi ```
``` arch -x86_64 pod install ```

## iOS

```npx react-native run-ios```

## Android

```npx react-native run-android```

