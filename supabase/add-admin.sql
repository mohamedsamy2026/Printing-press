-- =====================================================================
-- إضافة الأدمن (شغّله بعد ما تعمل المستخدم من Authentication → Users)
-- غيّر الإيميل ده لإيميل الأدمن بالظبط.
-- =====================================================================
insert into public.admins (user_id)
select id from auth.users where email = 'PUT-ADMIN-EMAIL-HERE'
on conflict do nothing;

-- تأكد: لازم يرجّع صف واحد
select a.user_id, u.email
from public.admins a join auth.users u on u.id = a.user_id;
