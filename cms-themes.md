# CMS 테마

- [소개](#introduction)
- [하위디렉토리](#subdirectories)
- [템플릿 구조](#structure)

테마는 당신의 웹사이트나 옥토버로 만들어진 웹 어플리케이션의 외양을 정의합니다. 옥토버 테마는 완전히 파일-기반이고 Git 과 같은 버전 컨트롤 체계로 관리될 수 있습니다. 이 페이지는 당신에게 옥토버 테마에 대해서 고-단계의 설명을 줄 것입니다.[페이지](pages), [조각](partials), [화면구도배치](layouts), [내용 파일](content) 게시물에서 더 자세한 사항을 찾아볼 수도 있습니다..

> 현재 활성 CMS 테마는 `app/config/cms.php`파일에 `activeTheme` 매개변수에 설정되어있다.

<a name="introduction" class="anchor" href="#introduction"></a>
## 소개하기

테마는 기본적으로 **/themes** 디렉토리 하위에 위치한다. 테마는 다음의 객체를 포함할 수 있다.

- [페이지(pages)](pages) - 웹사이트 페이지 나타냄.
- [조각(partials)](partials) - 재사용 가능한 HTML 마크업 덩어리.
- [화면구도배치(layouts)](layouts) - 페이지 뼈대구조(scaffold)정의.
- [내용 파일(content)](content) - 페이지나 화면구도배치와 분리되어 수정될 수 있는 text, HTML, [Markdown](http://daringfireball.net/projects/markdown/syntax) 블록.
- **자산(Asset) 파일** - 이미지, CSS 자바스크립트와 같은 자원 파일.

아래에서 당신은 예제 테마 디렉토리 구조를 보게됩니다. 각 옥토버 테마는 분리된 디렉토리에 위치하게 됩니다. 아래에서는 "website" 테마 디렉토리를 예로 듭니다.

    themes/
      website/              <== Theme starts here
        pages/              <== Pages directory
          home.htm
        layouts/            <== Layouts directory
          default.htm
        partials/           <== Partials directory
          sidebar.htm
        content/            <== Content directory
          intro.htm
        assets/             <== Assets directory
          css/
            my-styles.css
          js/
          images/

<a name="subdirectories" class="anchor" href="#subdirectories"></a>
## 하위 디렉토리

옥토버는 페이지, 조각, 화면구도배치, 내용 파일 용으로 한 단계의 하위디렉토리를 지원합니다(**자산(assets)** 디렉토리는 어떤 구조도 가능함). 이 것은 거대한 웹사이트 관리를 단순화합니다. 아래의 예제 디렉토리 구조에서 페이지(pages)와 조각(partials) 디렉토리가 **blog** 하위디렉토리를 포함하고 내용(content) 디렉토리가 **home** 하위디렉토리를 포함하는 것을 볼 수 있습니다.

    themes/
      website/
        pages/
          home.htm
          blog/                 <== 하위 디렉토리
            archive.htm
            category.htm
        partials/
          sidebar.htm
          blog/                 <== 하위 디렉토리
            category-list.htm
        content/
          footer-contacts.txt
          home/                 <== 하위 디렉토리
            intro.htm
        ...

하위디렉토리로부터 조각이나 내용파일을 참조하려면, 양식 이름 앞에 구체적인 하위디렉토리 이름을 명시해주세요. 하위디렉토리로부터 조각을 렌더링하는 예제 :

    {% partial "blog/category-list" %}

> **노트:** T템플릿 경로는 언제나 절대경로입니다. 만약 같은 하위디렉토리 내부의 조각에서 다른 조각을 렌더할 경우에도 하위디렉토리 이름을 구체적으로 명시해줘야 합니다.

<a name="structure" class="anchor" href="#structure"></a>

## 템플릿 구조

페이지, 조각, 화면구도배치, 템플릿은 최대 3 영역을 포함할 수 있다 : **설정**, **PHP 코드**, **Twig 마크업**.
영역은 `==` sequence 로 분리한다.

예제:

    url = "/blog"
    layout = "default"
    ==
    function onStart()
    {
        $this['posts'] = ...;
    }
    ==
    <h3>블로그 글</h3>
    {% for post in posts %}
        <h4>{{ post.title }}</h4>
        {{ post.content }}
    {% endfor %}

<a name="configuration-section" class="anchor" href="#configuration-section"></a>
### 설정 영역

설정 영역은 템플릿 매개변수를 설정한다. 설정 매개변수 지원은 서로 다른 CMS 템플릿에 명시되어 있고, 그들의 적절한 문서 게시글에 설명되어 있다. 설정 영역은 쌍따옴표로 매개변수 문자열 값을 가두는 단순한 [INI 양식](http://en.wikipedia.org/wiki/INI_file)을 사용한다. 예제 설정 영역은 페이지 템플릿용이다:

    url = "/blog"
    layout = "default"

    [component]
    parameter = "value"

<a name="php-section" class="anchor" href="#php-section"></a>
### PHP 코드 영역

PHP 영역 내부의 코드는 템플릿이 렌더되기 전에 매번 실행된다. PHP 영역은 모든 CMS 템플릿에서 선택적이며 그 내용은 정의된 템플릿 종류에 의존적이다. PHP 코드 영역은 텍스트 에디터에서 구문강조를 가능하게 하기 위해 P열기, 닫기 PHP 태그를 포함할 수 있다. 열기 닫기 태그는 항상 영역 분리자 `==` 와 다른 줄에 명시되어야 한다.

    url = "/blog"
    layout = "default"
    ==
    <?
    function onStart()
    {
        $this['posts'] = ...;
    }
    ?>
    ==
    <h3>블로그 게시글</h3>
    {% for post in posts %}
        <h4>{{ post.title }}</h4>
        {{ post.content }}
    {% endfor %}

> **노트:** PHP 영역에서 당신은 PHP `use` 키워드가 붙은 네임스페이스만 참조하거나 정의할 수 있다. 다른 PHP 코드는 PHP 영역에서 지원하지 않는다. 이것은 왜냐면 PHP 영역이 페이지가 해석될 때 PHP 클래스로 바뀌기 때문이다.

네임스페이스 참조 예제:

    url = "/blog"
    layout = "default"
    ==
    <?
    use Acme\Blog\Classes\Post;

    function onStart()
    {
      $this['posts'] = Post::get();
    }
    ?>
    ==

<a name="twig-section" class="anchor" href="#twig-section"></a>
### Twig 마크업 영역

Twig 영역은 템플릿에 의해서 렌터될 마크업을 정의한다.Twig 영역에서 당신은 [옥토버에서 제공하는 Twig 함수, 필터, 태그](markup)와 모든 [Twig](http://twig.sensiolabs.org/documentation) 함수, 태그 필터를 사용할 수 있다. Twig 영역의 내용은 템플릿 종류(페이지, 화면구도배치, 조각)에 달려있다.더 구체적인 Twig 객체에 대한 깊은 정보는 뒤따르는 문서에서 찾을 수 있다.