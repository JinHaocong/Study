import React, {ComponentType, Suspense} from "react";
import './lazyLoad.scss'
import Lottie from "@/components/Lottie.tsx";
import animation from "@/json/loading1.json"

/**
 * @description 路由懒加载
 * @param {ComponentType} Comp 需要访问的组件
 * @returns React.ReactNode
 */
const LazyLoad = (Comp: ComponentType): React.ReactNode => {
    const LoadingIndicator = (
        <div className='lazy-load-container'>
            <Lottie animation={animation}/>
        </div>
    );

    return (
        <Suspense fallback={LoadingIndicator}>
            <Comp/>
        </Suspense>
    );
};

export default LazyLoad;
