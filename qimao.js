// 七猫小说 去广告优化版 (Shadowrocket)
if (!$response || !$request) $done({});

let body = $response.body;
const url = $request.url;

try {
    let obj = JSON.parse(body);

    // ==================== 重点广告清理 ====================

    // 阅读页各种广告
    if (url.includes('reader-adv') || url.includes('chapter') || url.includes('content') || url.includes('read')) {
        if (obj.data) {
            // 清空广告数组
            if (obj.data.reader_chapter_list) obj.data.reader_chapter_list = [];
            if (obj.data.reader_bottom_list) obj.data.reader_bottom_list = [];
            if (obj.data.reader_page_turn_list) obj.data.reader_page_turn_list = [];
            if (obj.data.reader_inchapter) obj.data.reader_inchapter = [];
            if (obj.data.reader_getcoin) obj.data.reader_getcoin = [];
            if (obj.data.list) obj.data.list = [];
        }
    }

    // 书架、首页、弹窗广告
    if (url.includes('bookshelf') || url.includes('adv') || url.includes('index') || url.includes('home')) {
        if (obj.data) {
            if (obj.data.list) obj.data.list = [];
            if (obj.data.bookshelf) obj.data.bookshelf = [];
            if (obj.data.banner) obj.data.banner = [];
        }
    }

    // 其他推广/下载广告
    if (url.includes('download') || url.includes('coopen') || url.includes('popup')) {
        if (obj.data && obj.data.list) obj.data.list = [];
    }

    body = JSON.stringify(obj);

} catch (e) {
    console.log("七猫去广告脚本出错: " + e);
}

$done({ body: body });
