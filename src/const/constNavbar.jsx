export const NAVBAR_LINKS = {
    HOME: ['/trolley', '/women', '/men', '/kids'],
    WOMEN: ['/home', '/men', '/kids'],
    MEN: ['/home', '/women', '/kids'],
    KIDS: ['/home', '/women', '/men'],
    SEARCH: ['/home'],
    FAVORITE: ['/home', '/women', '/men', '/kids'],
    TROLLEY: ['/home', '/women', '/men', '/kids'],
    LOGIN: [
        '/home',
        '/women',
        '/men',
        '/kids',
        '/trolley',
        '/user/profile',
        '/user/favorites',
        '/user/record',
        '/user/shopping',
        // '/admin/statistics',
        '/admin/sales',
        '/admin/customer',
        '/admin/stock',
        '/admin/product',
        '/admin/brands',
        '/admin/types-categories',
    ]
}

export const DETAIL_PAGE = (path) => { return /^\/detail\/[a-zA-Z0-9]+$/.test(path); }