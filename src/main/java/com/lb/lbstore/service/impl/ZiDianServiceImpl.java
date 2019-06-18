/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.ZiDianDao;
import com.lb.lbstore.domain.ZiDian;
import com.lb.lbstore.service.ZiDianService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("ziDianServiceImpl")
public class ZiDianServiceImpl implements ZiDianService {

    @Autowired
    private ZiDianDao ziDianDao;

    @Override
    public ZiDian getZiDianById(Integer id) {
        return (ZiDian) ziDianDao.findObjectById(ZiDian.class, id);
    }

    @Override
    public List<ZiDian> getAllZiDians4fl(Integer qy_id, Integer zdfl_id) {
        return ziDianDao.getResult("from ZiDian ziDian where qy_id=" + qy_id + " and zdfl_id=" + zdfl_id, null);
    }

    @Override
    public boolean updateZiDian(ZiDian ziDian) {
        return ziDianDao.update(ziDian);
    }

    @Override
    public ZiDian saveZiDian(ZiDian ziDian) {
        int id = ziDianDao.save(ziDian);
        return (ZiDian) ziDianDao.findObjectById(ZiDian.class, id);
    }

    @Override
    public boolean deleteZiDian(Integer id) {
        String sql = "delete from zidian where id=" + id;
        return ziDianDao.excuteSql(sql);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select count(1) from ZiDian where qy_id=" + map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("zdfl_id")) {
            sql += " and zdfl_id = " + map.get("zdfl_id");
        }
        return ziDianDao.getCount(sql, null);
    }

    @Override
    public List<ZiDian> queryZiDiansByPage(HashMap map) {
        String hql = "from ZiDian where qy_id=" + map.get("qy_id");
        if (map.containsKey("mc")) {
            hql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("zdfl_id")) {
            hql += " and zdfl_id = " + map.get("zdfl_id");
        }
        return ziDianDao.getPageList(hql, null, Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public boolean existZiDian(Integer qy_id, Integer id, String mc) {
        return ziDianDao.existZiDian(qy_id, id, mc);
    }

}
