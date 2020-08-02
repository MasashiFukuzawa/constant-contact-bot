# 概要
- スプレッドシートに登録した家族・友人に長期間連絡を取っていなかった時に連絡を促すLINE bot
- Google Apps Script × TypeScript でDDDライクに実装

# 機能紹介
## LINEへの通知
- 以下の2パターンでbotから通知が送られる
  1. 設定した期間連絡を取っていなかった場合
  2. 登録した家族・友人の誕生日

![image](https://user-images.githubusercontent.com/44726460/89118618-e00e8700-d4e1-11ea-91c4-fce8eac731cd.png)

## コマンドを使ったデータの操作
### Help
![image](https://user-images.githubusercontent.com/44726460/89118552-66769900-d4e1-11ea-974b-ab2f0beaa2e8.png)

### Create
![image](https://user-images.githubusercontent.com/44726460/89118564-87d78500-d4e1-11ea-9e89-993dc3a0dada.png)

### Update
![image](https://user-images.githubusercontent.com/44726460/89118584-a6d61700-d4e1-11ea-8efc-b6cc1522f937.png)

### Delete
![image](https://user-images.githubusercontent.com/44726460/89118605-c4a37c00-d4e1-11ea-9c6a-f8252d2a2831.png)

## その他
- Googleカレンダーから誕生日情報を取得＆家族・友人のデータに紐付けて保存
- 人毎に通知期間を変更可能

# 動作環境
- TypeScript: 3.8.3
- @google/clasp: 2.3.0
- jest: 26.1.0

# 環境構築
## install
```sh:
 $ mkdir xxx
 $ cd xxx
 $ git init .
 $ hub create
 $ npm init -y
 $ npm i -d @google/clasp @types/google-apps-script @types/jest jest ts-jest
```

## set config files
### jsconfig
jsconfig.json
```json:jsconfig.json
 {
   "compilerOptions": {
     "lib": ["esnext"]
   }
 }
```

### jest
```sh:
$ jest --init
```

jest.config.js
```js:jest.config.js
module.exports = {
  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
    // For mock
    SpreadsheetApp: {},
    PropertiesService: {},
    Moment: {},
    UrlFetchApp: {},
  },

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    'node_modules',
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'tsx',
  ],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
```

package.json
```json:package.json
{
  "scripts": {
    "test": "jest"
  },
}
```

## GAS
```sh:
$ clasp create --title "YOUR APP TITLE" --type sheets --rootDir ./src
$ clasp pull
```

src/appscript.json
```json:src/appscript.json
 {
  "timeZone": "Asia/Tokyo",
  "dependencies": {
    "libraries": [{
      "userSymbol": "Moment",
      "libraryId": "15hgNOjKHUG4UtyZl9clqBbl23sDvWMS8pfDJOyIapZk5RBqwL3i-rlCo",
      "version": "9"
    }]
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

```sh:
$ clasp push
$ y
```

# テーブル設計
## dearets table
![image](https://user-images.githubusercontent.com/44726460/89117900-62944800-d4dc-11ea-815e-585159d8a4c1.png)

## types table
![image](https://user-images.githubusercontent.com/44726460/89117920-91122300-d4dc-11ea-9d01-327bb64a8d37.png)

## notification_periods table
![image](https://user-images.githubusercontent.com/44726460/89117923-996a5e00-d4dc-11ea-8a0b-742e67ca4485.png)

# ディレクトリ構造
```
src
├── appsscript.json
├── batch
│   └── birthday_migrate_controller.ts
├── constants
│   └── constants.ts
├── domain
│   ├── application
│   │   ├── batch
│   │   │   └── birthday_migrate_interactor.ts
│   │   └── dearest
│   │       ├── dearest_create_interactor.ts
│   │       ├── dearest_delete_interactor.ts
│   │       ├── dearest_help_interactor.ts
│   │       ├── dearest_push_interactor.ts
│   │       └── dearest_update_interactor.ts
│   └── domain
│       ├── dearest
│       │   ├── dearest.ts
│       │   ├── dearest_repository_interface.ts
│       │   └── value_object
│       │       ├── dearest_birthday.ts
│       │       ├── dearest_id.ts
│       │       ├── dearest_last_contacted_date.ts
│       │       ├── dearest_name.ts
│       │       ├── dearest_notification_period_id.ts
│       │       └── dearest_type_id.ts
│       ├── notification_period
│       │   ├── notification_period.ts
│       │   ├── notification_period_repository_interface.ts
│       │   └── value_object
│       │       ├── notification_period_id.ts
│       │       ├── notification_period_term.ts
│       │       └── notification_period_unit.ts
│       └── type
│           ├── type.ts
│           ├── type_repository_interface.ts
│           └── value_object
│               ├── type_description.ts
│               └── type_id.ts
├── external_api
│   └── client
│       └── google_calender_api_client.ts
├── google_apps_script
│   └── functions
│       ├── do_post.ts
│       ├── migrate_birthday.ts
│       └── push_messages.ts
├── index.d.ts
├── spreadsheet_infrastructure
│   ├── dearests
│   │   └── spreadsheet_dearest_repository.ts
│   ├── notification_periods
│   │   └── spreadsheet_notification_period_repository.ts
│   └── types
│       └── spreadsheet_type_repository.ts
├── use_case
│   ├── batch
│   │   └── birthday_migrate
│   │       ├── birthday_migrate_input_data.ts
│   │       └── birthday_migrate_use_case_interface.ts
│   └── dearest
│       ├── create
│       │   ├── dearest_create_input_data.ts
│       │   ├── dearest_create_output_data.ts
│       │   ├── dearest_create_presenter_interface.ts
│       │   └── dearest_create_use_case_interface.ts
│       ├── delete
│       │   ├── dearest_delete_input_data.ts
│       │   ├── dearest_delete_output_data.ts
│       │   ├── dearest_delete_presenter_interface.ts
│       │   └── dearest_delete_use_case_interface.ts
│       ├── help
│       │   ├── dearest_help_output_data.ts
│       │   ├── dearest_help_presenter_interface.ts
│       │   └── dearest_help_use_case_interface.ts
│       ├── push
│       │   ├── dearest_push_output_data.ts
│       │   ├── dearest_push_presenter_interface.ts
│       │   └── dearest_push_use_case_interface.ts
│       └── update
│           ├── dearest_update_input_data.ts
│           ├── dearest_update_output_data.ts
│           ├── dearest_update_presenter_interface.ts
│           └── dearest_update_use_case_interface.ts
└── webhook_app
    ├── authorization
    │   └── line_authorization.ts
    ├── dearest
    │   ├── create
    │   │   ├── dearest_create_controller.ts
    │   │   ├── dearest_create_presenter.ts
    │   │   ├── dearest_create_view_model.ts
    │   │   └── views
    │   │       └── line_dearest_create_view.ts
    │   ├── delete
    │   │   ├── dearest_delete_controller.ts
    │   │   ├── dearest_delete_presenter.ts
    │   │   ├── dearest_delete_view_model.ts
    │   │   └── views
    │   │       └── line_dearest_delete_view.ts
    │   ├── help
    │   │   ├── dearest_help_controller.ts
    │   │   ├── dearest_help_presenter.ts
    │   │   ├── dearest_help_view_model.ts
    │   │   └── views
    │   │       └── line_dearest_help_view.ts
    │   ├── push
    │   │   ├── dearest_push_controller.ts
    │   │   ├── dearest_push_presenter.ts
    │   │   ├── dearest_push_view_model.ts
    │   │   └── views
    │   │       └── line_dearest_push_view.ts
    │   └── update
    │       ├── dearest_update_controller.ts
    │       ├── dearest_update_presenter.ts
    │       ├── dearest_update_view_model.ts
    │       └── views
    │           └── line_dearest_update_view.ts
    └── view_component
        └── line_view_component.ts
```

# References
- [ドメイン駆動設計入門 ボトムアップでわかる! ドメイン駆動設計の基本](https://www.amazon.co.jp/%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88%E5%85%A5%E9%96%80-%E3%83%9C%E3%83%88%E3%83%A0%E3%82%A2%E3%83%83%E3%83%97%E3%81%A7%E3%82%8F%E3%81%8B%E3%82%8B-%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88%E3%81%AE%E5%9F%BA%E6%9C%AC-%E6%88%90%E7%80%AC-%E5%85%81%E5%AE%A3/dp/479815072X/ref=sr_1_1?dchild=1&keywords=%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95&qid=1596351826&sr=8-1)
- [実装クリーンアーキテクチャ](https://qiita.com/nrslib/items/a5f902c4defc83bd46b8)
- [YouTube 【プログラミング】実践クリーンアーキテクチャ 音ズレ修正Ver.](https://www.youtube.com/watch?v=BvzjpAe3d4g&feature=youtu.be)
- [日付＆時刻の便利ライブラリ「Moment.js」をGoogle Apps Scriptで使う方法](https://tonari-it.com/gas-moment-js-moment/)
- [TypescriptのGASをJestでテストする](https://tech.actindi.net/2019/07/03/081258)
- [GAS開発のJestによるモック入り結合テスト仕立て / The way to develop GAS with mocking integration test by Jest
](https://speakerdeck.com/aquitcd/the-way-to-develop-gas-with-mocking-integration-test-by-jest)
- [[Jest+TypeScript] クラスと関数のモック化](https://qiita.com/yuma-ito-bd/items/38c929eb5cccf7ce501e)
