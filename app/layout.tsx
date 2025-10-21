import "./globals.css";
import NavigationMenuPage from "./menu/page"; // 顶部菜单

export const metadata = {
  title: "Browser Fingerprint Detect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 固定顶部菜单 */}
        <header className="fixed top-0 left-0 w-full h-12 z-50 bg-white shadow flex items-center justify-center">
          <NavigationMenuPage />
        </header>

        {/* 页面内容，添加上边距，避免被固定菜单遮挡 */}
        <main className="pt-3">{children}</main>
      </body>
    </html>
  );
}
