CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username varchar (16) NOT NULL,
    email varchar (128) NOT NULL,
    pass char (60) NOT NULL,
    selected_service varchar (16) NOT NULL,
    service_active boolean NOT NULL,
    user_active boolean DEFAULT FALSE,
    activation_hash char (32),
    paid_until date
);


CREATE TABLE server_configs (
    server_id serial PRIMARY KEY,
    username varchar (16),
    servername varchar (24),
    datacenter varchar (8),
    server_password varchar (32),
    cpu varchar (4),
    ram numeric,
    disk_size numeric DEFAULT 10,
    home varchar (256),
    res_x numeric,
    res_y numeric,
    logo_scale numeric,
    logo_x numeric,
    image_duration numeric,
    vids_path varchar (256),
    logo varchar (256),
    run_video boolean DEFAULT TRUE,
    crf numeric DEFAULT 0,
    output_settings varchar (1024),
    second_output_settings varchar (256),
    run_main boolean DEFAULT TRUE,
    rtmp_key varchar (128),
    input_settings varchar (512),
    input_video_stream varchar (128),
    text_file_path varchar (256),
    music_list_file_path varchar (256),
    main_settings varchar(256),
    mp3_path varchar (256),
    repeat_num numeric
);