
export class PolicyClass {
    config: any = {
        twaf_secrules: {
            state: true,
            reqbody_state: true,
            reqbody_limit: 131072,
            body_filter_state: false,
            respbody_limit: 128,
            intelligent_behavior_detection: true,
            disable_vars: ["REQBODY_ERROR", "MULTIPART_STRICT_ERROR"],
            action: 'deny',
            protection_level: 9,
            action_meta: "403"
        },
        twaf_anti_hotlink: {
            state: false,
            mode: 'referer',
            action: 'deny',
            action_meta: "403",
            uri_ext: ["html", "js", "css", "txt", "jsp", "png"],
            exclude: [],
            entry: []
        },
        twaf_limit_conn: {
            state: true,
            trigger_thr: {
                req_flow_max: 314572800,
                req_count_max: 10000
            },
            clean_thr: {
                req_max: 50,
                new_conn_max: 40,
                conn_max: 100,
                uri_frequency_max: 3000
            },
            action: 'reset_connection',
            action_meta: "403"
        },
        twaf_anti_mal_crawler: {
            state: true,
            force_scan_robots_state: true,
            action: 'deny',
            action_meta: "403"
        }
    }
}
