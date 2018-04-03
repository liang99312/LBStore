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