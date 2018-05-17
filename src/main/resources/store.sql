CREATE DATABASE store DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE `store`.`qiye` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lxr` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lxdh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gly` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` int(11) DEFAULT 0,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`a01` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `bh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `a0111` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `a0105` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `a01pic` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `a01qx` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` int(11) DEFAULT '0',
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

insert into `store`.a01 (id, bh, mc, password, state,qy_id,a01qx) 
  values(1,'sa','super系统管理员','sa123',9,-1,'-1');

CREATE TABLE `store`.`bumen` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` int(11) DEFAULT 0,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`gongyingshang` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lxr` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lxdh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` int(11) DEFAULT 0,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`kehu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lxr` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lxdh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` int(11) DEFAULT 0,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`wuzileibie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tysx` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` int(11) DEFAULT 0,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`wuzizidian` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `wzlb_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dw` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` int(11) DEFAULT 0,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`cangku` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` int(11) DEFAULT 0,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`baobiao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mk` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mkdm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `f_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`kuwei` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `ck_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qsh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `jsh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`cangkua01` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `ck_id` INT NOT NULL,
  `a01_id` INT NOT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`zidianfenlei` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`zidian` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `zdfl_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`wuzixhgg` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `wzzd_id` INT NOT NULL,
  `mc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dm` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sl` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `jb` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bzq` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`ruku` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `ck_id` INT NOT NULL,
  `kh_id` INT NULL,
  `gys_id` INT NULL,
  `rkr_id` INT NOT NULL,
  `spr_id` INT NULL,
  `lsh` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ly` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bz` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sl` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `je` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sj` datetime DEFAULT NULL,
  `spsj` datetime DEFAULT NULL,
  `state` int(11) DEFAULT 0,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`rukudetail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `ck_id` INT NOT NULL,
  `rk_id` INT NOT NULL,
  `kh_id` INT NULL,
  `gys_id` INT NULL,
  `wzzd_id` INT NOT NULL,
  `wzmc` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wzlb_id` INT NOT NULL,
  `xhgg_id` INT NOT NULL,
  `xhgg` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ly` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dh` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pp` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `scc` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `txm` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `scrq` datetime DEFAULT NULL,
  `bzq` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dj` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dw` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zldw` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `jlfs` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bzgg` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sl` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zl` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tysx` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dymx` varchar(4000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `kw` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `store`.`kucun` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qy_id` INT NOT NULL,
  `ck_id` INT NOT NULL,
  `rk_id` INT NOT NULL,
  `rkd_id` INT NOT NULL,
  `kh_id` INT NULL,
  `gys_id` INT NULL,
  `wzzd_id` INT NOT NULL,
  `wzmc` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wzlb_id` INT NOT NULL,
  `xhgg_id` INT NOT NULL,
  `rkr_id` INT NOT NULL,
  `spr_id` INT NOT NULL,
  `xhgg` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ly` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dh` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pp` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `scc` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `txm` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rksj` datetime DEFAULT NULL,
  `scrq` datetime DEFAULT NULL,
  `bzq` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `scrq` datetime DEFAULT NULL,
  `dj` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ckdj` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dw` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zldw` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `jlfs` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bzgg` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sl` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `syl` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zl` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `syzl` FLOAT(7,2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tysx` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dymx` varchar(4000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `kw` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`))ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;