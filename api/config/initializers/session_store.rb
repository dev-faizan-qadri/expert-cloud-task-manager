# config/initializers/session_store.rb
Rails.application.config.session_store :cookie_store,
  key: "_yourapp_session",
  same_site: :lax,
  secure: Rails.env.production?
