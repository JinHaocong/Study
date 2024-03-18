import { message, Tabs, TabsProps } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setTabsList } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import MoreButton from "./components/MoreButton";
import "./index.less";

interface Tabs {
	tabsList: {
		path: string;
		title: string;
	}[];
}

const LayoutTabs = (props: any) => {
	const { tabsList } = props.tabs as Tabs;
	const { themeConfig } = props.global;
	const { setTabsList } = props;
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [activeValue, setActiveValue] = useState<string>(pathname);

	useEffect(() => {
		addTabs();
	}, [pathname]);

	// click tabs
	const clickTabs = (path: string) => {
		navigate(path);
	};

	// add tabs
	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: route.meta!.title, path: route.path });
		}
		setTabsList(newTabsList);
		setActiveValue(pathname);
	};

	// delete tabs
	const delTabs = (tabPath?: string) => {
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("你删除了Tabs标签 😆😆😆");
		setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath));
	};

	const items: TabsProps["items"] = tabsList.map(item => {
		return {
			closable: item.path !== HOME_URL,
			label: (
				<span>
					{item.path === HOME_URL ? <HomeFilled /> : null}
					{item.title}
				</span>
			),
			key: item.path
		};
	});

	return (
		<>
			{!themeConfig.tabs && (
				<div className="tabs">
					<Tabs
						items={items}
						animated
						activeKey={activeValue}
						onChange={clickTabs}
						hideAdd
						type="editable-card"
						onEdit={path => {
							delTabs(path as string);
						}}
					></Tabs>
					<MoreButton tabsList={tabsList} delTabs={delTabs} setTabsList={setTabsList}></MoreButton>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setTabsList };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
