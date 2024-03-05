import React, {ComponentType, Suspense} from "react";
import './lazyLoad.scss'

/**
 * @description 路由懒加载
 * @param {ComponentType} Comp 需要访问的组件
 * @returns React.ReactNode
 */
const LazyLoad = (Comp: ComponentType): React.ReactNode => {
    const LoadingIndicator = (
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );

    return (
        <Suspense fallback={LoadingIndicator}>
            <Comp/>
        </Suspense>
    );
};

export default LazyLoad;
