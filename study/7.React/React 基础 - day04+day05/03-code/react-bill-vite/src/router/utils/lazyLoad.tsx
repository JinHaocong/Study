import React, {ComponentType, Suspense} from "react";
import {SpinLoading} from "antd-mobile";

/**
 * @description 路由懒加载
 * @param {ComponentType} Comp 需要访问的组件
 * @returns React.ReactNode
 */
const LazyLoad = (Comp: ComponentType): React.ReactNode => {
    const LoadingIndicator = (
        <SpinLoading
            color='primary'
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                margin: "0 auto",
                '--size': '32px'
            }}
        />
    );

    return (
        <Suspense fallback={LoadingIndicator}>
            <Comp/>
        </Suspense>
    );
};

export default LazyLoad;
