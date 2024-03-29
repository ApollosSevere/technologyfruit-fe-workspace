"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { SearchInput } from "./search-input";
import { selectIsTeacher, selectUser } from "@/redux/auth/selector";
import { useAppSelector } from "@/redux/utils/hooks";
import { LogoutDropdown } from "./logout";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  const isTeacher = useAppSelector(selectIsTeacher);
  const user = useAppSelector(selectUser);

  return (
    <>
      {isSearchPage && (
        <div className="hidden  md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <LogoutDropdown />
      </div>
    </>
  );
};
