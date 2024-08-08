-- 오늘의 쿼리
-- 모두 지워보자! 조건없이 헉.........!!
-- delete from 테이블명
delete from `friends`

-- 지운후 입력하면 이전 데이터 개수 (인덱스) 다음번호가 입력됨
-- 데이터 이력이 지워지지 않음!
-- 완전초기화 하려면 truncate table 
TRUNCATE TABLE `friends`

-- 전체개수 확인
SELECT COUNT(*) AS "전체개수" FROM `friends` WHERE 1

-- fname 항복에 의한 오름차순 : RDER BY `fname` ASC
SELECT * FROM `friends`ORDER BY `fname` ASC
-- fname 항복에 의한 내림차순 : RDER BY `fname` DESC
SELECT * FROM `friends`ORDER BY `fname` DESC