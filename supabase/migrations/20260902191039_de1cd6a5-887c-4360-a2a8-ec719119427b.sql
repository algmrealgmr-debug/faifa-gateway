CREATE TABLE public.site_analytics (
  id integer PRIMARY KEY DEFAULT 1,
  visitor_count integer NOT NULL DEFAULT 5078,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_analytics TO anon;
GRANT SELECT ON public.site_analytics TO authenticated;
GRANT ALL ON public.site_analytics TO service_role;

ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site analytics"
  ON public.site_analytics FOR SELECT
  USING (true);

INSERT INTO public.site_analytics (id, visitor_count)
VALUES (1, 5078)
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.site_analytics
     SET visitor_count = visitor_count + 1,
         updated_at = now()
   WHERE id = 1
  RETURNING visitor_count INTO new_count;

  IF new_count IS NULL THEN
    INSERT INTO public.site_analytics (id, visitor_count)
    VALUES (1, 5079)
    ON CONFLICT (id) DO UPDATE SET visitor_count = public.site_analytics.visitor_count + 1
    RETURNING visitor_count INTO new_count;
  END IF;

  RETURN new_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_visitor_count() TO anon, authenticated, service_role;