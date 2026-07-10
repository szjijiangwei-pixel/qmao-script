// 七猫小说去广告 + VIP解锁 (Shadowrocket优化版)
if (!$response || !$request) $done({});

let body = $response.body;
const url = $request.url;

try {
    let obj = JSON.parse(body);

    // VIP解锁
    if (url.includes('user') || url.includes('vip') || url.includes('profile')) {
        if (obj.data) {
            obj.data.is_vip = 1;
            obj.data.isLifetimeVip = 1;
            obj.data.year_vip_show = 1;
            obj.data.vip_privilege_desc = "终身VIP · 无广告";
        }
    }

    // 阅读页广告清理
    if (url.includes('reader-adv') || url.includes('chapter') || url.includes('content')) {
        if (obj.data) {
            if (obj.data.reader_chapter_list) obj.data.reader_chapter_list = [];
            if (obj.data.reader_bottom_list) obj.data.reader_bottom_list = [];
            if (obj.data.reader_page_turn_list) obj.data.reader_page_turn_list = [];
            if (obj.data.reader_inchapter) obj.data.reader_inchapter = [];
            if (obj.data.list) obj.data.list = [];
        }
    }

    // 书架、首页、广告接口清理
    if (url.includes('bookshelf') || url.includes('adv') || url.includes('index')) {
        if (obj.data) {
            if (obj.data.list) obj.data.list = [];
            if (obj.data.bookshelf) obj.data.bookshelf = [];
        }
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log("七猫脚本执行出错: " + e);
}

$done({ body: body });
