define({ "api": [
  {
    "type": "get",
    "url": "/api/matches",
    "title": "",
    "description": "<p>Get all matches</p>",
    "version": "1.0.0",
    "name": "Get_matches",
    "group": "Match",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "success": {
      "fields": {
        "Ok 200": [
          {
            "group": "Ok 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>Successfully get matches</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<ul> <li>No matches found</li> </ul>"
          }
        ]
      }
    },
    "filename": "src/api/routes/matchRoutes.js",
    "groupTitle": "Match"
  },
  {
    "type": "get",
    "url": "/",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_streaming_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_streaming_src_api_routes_main_route_js",
    "name": "Get"
  },
  {
    "type": "get",
    "url": "/admin",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_streaming_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_streaming_src_api_routes_main_route_js",
    "name": "GetAdmin"
  },
  {
    "type": "get",
    "url": "/admin/create-streaming",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_streaming_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_streaming_src_api_routes_main_route_js",
    "name": "GetAdminCreateStreaming"
  },
  {
    "type": "get",
    "url": "/streaming",
    "title": "",
    "version": "0.0.0",
    "filename": "src/api/routes/main.route.js",
    "group": "_home_noat_Workspace_streaming_src_api_routes_main_route_js",
    "groupTitle": "_home_noat_Workspace_streaming_src_api_routes_main_route_js",
    "name": "GetStreaming"
  }
] });
